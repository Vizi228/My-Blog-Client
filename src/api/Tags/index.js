import { instance } from "..";

class Tag {
  async getTags() {
    const data = await instance.get('/tags')
    return data
  }
}

export const Tags = new Tag()