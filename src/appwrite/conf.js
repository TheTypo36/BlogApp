import config from "../config/config";
import { Client, ID, Databases, Storage, Query, ImageFormat } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      console.log(userId);
      return await this.databases.createDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service:: createPost:: error", error);
      throw error;
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service:: updatePost:: error", error);
      throw error;
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service:: deletePost:: error", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      const doc = await this.databases.getDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug
      );
      return doc;
    } catch (error) {
      console.log("Appwrite service::getDocument:: error", error);
      throw error;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service:: getPosts:: error", error);
      throw error;
    }
  }
  //file upload file
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
      return true;
    } catch (error) {
      console.log("Appwrite service::uploadFile:: error", error);
      throw error;
    }
  }
  //delete file
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service::deleteFile:: error", error);
      throw error;
    }
  }
  async getFilePreview(fileId) {
    console.log("filId", fileId);
    try {
      return this.bucket.getFilePreview(config.appwriteBucketId, fileId, 1000);
    } catch (error) {
      console.log("Appwrite service::GetFilePreview:: error", error);
      throw error;
    }
  }
}
const service = new Service();

export default service;
