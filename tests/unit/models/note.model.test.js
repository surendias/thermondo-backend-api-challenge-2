const faker = require('faker');
const { Note } = require('../../../src/models');

describe('Note model', () => {
  describe('Note validation', () => {
    let newNote;
    beforeEach(() => {
      newNote = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'note',
      };
    });

    test('should correctly validate a valid note', async () => {
      await expect(new Note(newNote).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if email is invalid', async () => {
      newNote.email = 'invalidEmail';
      await expect(new Note(newNote).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password length is less than 8 characters', async () => {
      newNote.password = 'passwo1';
      await expect(new Note(newNote).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password does not contain numbers', async () => {
      newNote.password = 'password';
      await expect(new Note(newNote).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password does not contain letters', async () => {
      newNote.password = '11111111';
      await expect(new Note(newNote).validate()).rejects.toThrow();
    });

    test('should throw a validation error if role is unknown', async () => {
      newNote.role = 'invalid';
      await expect(new Note(newNote).validate()).rejects.toThrow();
    });
  });

  describe('Note toJSON()', () => {
    test('should not return note password when toJSON is called', () => {
      const newNote = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'note',
      };
      expect(new Note(newNote).toJSON()).not.toHaveProperty('password');
    });
  });
});
