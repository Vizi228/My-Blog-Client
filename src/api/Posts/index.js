import { instance } from "..";

class Post {
  async getAllPosts(query) {
      const data = await instance.get(`posts${query}`);
      return data
  }
  async getTagsPosts(tag, query) {
      const data = await instance.get(`posts/tags/${tag}${query}`);
      return data
  }
  async getPost(id) {
    const data = await instance.get(`posts/${id}`);
    return data
  }
  async createPost(req) {
    const post = {
      title: req.title,
      text: req.text,
      imageUrl: req.imageUrl,
      tags: req.tags,
    }
    const data = await instance.post(`posts`, post);
    return data
  }
  async deletePost(id) {
    const data = await instance.delete(`posts/${id}`);
    return data
  }
  async updatePost(req, id) {
    const post = {
      title: req.title,
      text: req.text,
      imageUrl: req.imageUrl,
      tags: req.tags,
    }
    const data = await instance.patch(`posts/${id}`, post);
    return data
  }
}

export const Posts = new Post()