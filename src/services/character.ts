import { dataBase } from '@/lib/dexie'
import { type CharacterDatabaseData, type CharacterEditorState } from '@/types/character'
import 'dexie-export-import'
import { nanoid } from 'nanoid'

export const createCharacter = async (character: CharacterEditorState): Promise<CharacterDatabaseData> => {
  const id = nanoid()
  await dataBase.characters.add({
    ...character,
    id
  })
  return await dataBase.characters.where('id').equals(id).first() as CharacterDatabaseData
}

export const getAllCharacters = async (): Promise<CharacterDatabaseData[]> => {
  return await dataBase.characters.toArray()
}

export const updateCharacter = async (character: CharacterDatabaseData): Promise<CharacterDatabaseData> => {
  await dataBase.characters.put(character)
  return await dataBase.characters.where('id').equals(character.id).first() as CharacterDatabaseData
}

export const deleteCharacter = async (id: string): Promise<void> => {
  await dataBase.characters.where('id').equals(id).delete()
}

export const deleteCharacterMulti = async (arrIds: string[]): Promise<void> => {

  dataBase.transaction('rw', dataBase.characters, function* () {
    var deleteCount = yield dataBase.characters
      .where('id')
      .anyOf(arrIds)
      .delete()

    console.log ("Successfully deleted " + deleteCount + " items");
}).catch (e => {
    console.error (e);
});

  // await dataBase.characters.where('id').anyOf(arrIds).delete()
}

export const deleteAllCharacters = async (): Promise<void> => {
  await dataBase.characters.clear()
}

export const exportCharacterCollection = async (): Promise<Blob> => {
  const blob = await dataBase.export({
    filter (table) {
      return table === 'characters'
    }
  })
  return blob
}

export const importCharacterCollection = async (file: File): Promise<void> => {
  await dataBase.import(file, {
    filter (table) {
      return table === 'characters'
    }
  })
}
