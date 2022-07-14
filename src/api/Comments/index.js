import { instance } from "..";

class Comment {
  async getAllComments() {
    const comments = await instance.get(`comments`);
    return comments
  }
  async getPostsComment(postId) {
    const comments = await instance.get(`comments/${postId}`);
    return comments
  }
  async create(req) {
    const create = await instance.post('comments', req);
    return create
  }
  async deleteComment(id) {
    const data = await instance.delete(`comments/${id}`);
    return data
  }
  async updateComment(req, id) {
    const comment = {
      text: req.text,
      postId: req.postId
    }
    const data = await instance.patch(`comments/${id}`, comment);
    return data
  }
}

export const Comments = new Comment()