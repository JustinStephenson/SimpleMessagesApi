import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

type Content = {
  content: string;
  id: number;
};

type Contents = {
  [key: string]: Content;
};

@Injectable()
export class MessagesRepository {
  async #getContents(): Promise<Contents> {
    const contents = await readFile('messages.json', 'utf-8');
    return JSON.parse(contents);
  }

  async findOne(id: string): Promise<Content> {
    const messages = await this.#getContents();
    return messages[id];
  }

  async findAll(): Promise<Contents> {
    const messages = await this.#getContents();
    return messages;
  }

  async create(content: string): Promise<void> {
    const messages = await this.#getContents();
    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };
    await writeFile('messages.json', JSON.stringify(messages));
  }
}
