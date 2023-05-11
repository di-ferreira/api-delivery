import {
  iTypeMenu,
  iTypeMenuRepository,
  iUpdatedTypeMenu,
} from '@ProjectTypes/TypeMenu/iTypeMenu';
import AppError from '@shared/errors/AppError';
import TypeMenuRepository from '../Repository';

class UpdateTypeMenuService {
  private typeMenuRepository: iTypeMenuRepository;

  constructor() {
    this.typeMenuRepository = new TypeMenuRepository();
  }

  public async execute({
    id,
    name,
    description,
  }: iUpdatedTypeMenu): Promise<iTypeMenu> {
    const typeMenu = await this.typeMenuRepository.findById(id);

    if (!typeMenu) {
      throw new AppError('TypeMenu not found');
    }

    typeMenu.name = name;
    typeMenu.description = description;

    await this.typeMenuRepository.save(typeMenu);

    return typeMenu;
  }
}

export default UpdateTypeMenuService;
