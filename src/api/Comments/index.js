import { instance } from "..";

class Comment {
  async create(req) {
    const create = await instance.post('/comments', req);
    return create
  }
}

export const Comments = new Comment()