import { In, Repository } from 'typeorm';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import Product from '../entities/Product';
import { ICreateProduct } from '../../../domain/models/ICreateProduct';

class ProductRepository implements IProductsRepository {
  constructor(private ormRepository: Repository<Product>) {}
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsId = products.map(product => product.id);

    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productsId),
      },
    });

    return existsProducts;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return product;
  }

  public async find(): Promise<Product[]> {
    const product = await this.ormRepository.find();

    return product;
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
}

export default ProductRepository;
