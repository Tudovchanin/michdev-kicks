import type { CreateUser, UpdateProfile } from '~~/shared/types/user';
import type { UserRepository } from '../types/repositories';


class UserService {

  constructor(
    private userRepository: UserRepository,
  ) {}

  async createUser(data: CreateUser) {
    const newUser = await this.userRepository.createUser(data);
    return newUser;
  }

  async findByEmail(email: string) {
    const user = this.userRepository.findByEmail(email);
    if (!user) {
      throw createError({ statusCode: 404, message: 'Пользователь не найден' });
    }
    return user;
  }

  async findById(id: number) {
    const user = this.userRepository.findById(id);
    if (!user) {
      throw createError({ statusCode: 404, message: 'Пользователь не найден' });
    }
    return user;
  }

  async updateProfile(id: number, data: UpdateProfile) {
    return this.userRepository.updateById(id, data);
  }

  async verifyEmail(id: number) {
    return this.userRepository.updateById(id, { isEmailVerified: true });
  }

  async deleteById(id: number) {
    const count = this.userRepository.deleteById(id);
    if (!count) {
      throw createError({ statusCode: 404, message: 'Пользователь не найден' });
    }
    return `$delete user ${id}`;
  }

  async deleteByEmail(email: string) {
    const count = this.userRepository.deleteByEmail(email);
    if (!count) {
      throw createError({ statusCode: 404, message: 'Пользователь не найден' });
    }
    return `$delete user ${email}`;
  }
}


export default UserService;