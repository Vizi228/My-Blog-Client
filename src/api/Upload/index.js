import { instance } from "..";

class Uploads {
  async uploadImage(e) {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('image', file);
    const { data } = await instance.post('upload', formData);
    return data
  }
  async uploadProfileImage(e) {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('image', file);
    const { data } = await instance.post('upload/profile', formData);
    return data
  }
}

export const Upload = new Uploads()