import type { CreateUser, UpdateProfile, UserBase } from "~~/shared/types/user";
import type { UserRepository } from "../types/repositories";

class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUser): Promise<UserBase> {
    return await this.userRepository.createUser(data);
  }

  async findByEmail(email: string): Promise<UserBase | null> {
    return await this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<UserBase | null> {
    return await this.userRepository.findById(id);
  }

  async updateProfile(id: string, data: UpdateProfile) {
    const updatedUser = await this.userRepository.updateById(id, data);
  
  if (!updatedUser) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: 'Пользователь не найден'
    });
  }
  return updatedUser;
  }

  async verifyEmail(id: string) {
    const result = await this.userRepository.updateById(id, { isEmailVerified: true });
  
  if (!result) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: 'Не удалось подтвердить почту: пользователь не найден'
    });
  }
  
  return result;
  }

  async deleteById(id: string):Promise<string> {
    const isDeleted =  await this.userRepository.deleteById(id);
    if (!isDeleted) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Пользователь не найден для удаления",
      });
    }
    return `$delete user ${id}`;
  }
}

export default UserService;
