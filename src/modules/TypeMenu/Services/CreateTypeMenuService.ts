import {
  iCreateTypeMenu,
  iTypeMenu,
  iTypeMenuRepository,
} from '@ProjectTypes/TypeMenu/iTypeMenu';
import AppError from '@shared/errors/AppError';
import TypeMenuRepository from '../Repository';

class CreateTypeMenuService {
  private typeMenuRepository: iTypeMenuRepository;

  constructor() {
    this.typeMenuRepository = new TypeMenuRepository();
  }

  public async execute({
    name,
    description,
  }: iCreateTypeMenu): Promise<iTypeMenu> {
    const typeMenuExists = await this.typeMenuRepository.findByType(name);
    console.log(typeMenuExists);
    if (typeMenuExists.length >= 1) {
      throw new AppError('There is already one Type with this name');
    }

    const typeMenu = await this.typeMenuRepository.create({
      name,
      description,
    });

    return typeMenu;
  }
}

export default CreateTypeMenuService;
