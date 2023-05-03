import AppDataSource from '@shared/infra/typeorm';
import { Router, Request, Response } from 'express';
import { Cliente } from 'src/entities/Cliente';
import { Enderecos } from 'src/entities/Enderecos';

const clienteRoutes = Router();

const UserRepository = AppDataSource.getRepository(Cliente);

const AddressRepository = AppDataSource.getRepository(Enderecos);

const CreateUser = async (request: Request, response: Response) => {
  try {
    const { nome, telefone, rua, numero, bairro, cidade, uf, complemento } =
      request.body;

    const cliente = new Cliente();
    cliente.nome = nome;
    cliente.telefone = telefone;

    await UserRepository.save(cliente);

    const endereco = new Enderecos();
    endereco.rua = rua;
    endereco.numero = numero;
    endereco.bairro = bairro;
    endereco.cidade = cidade;
    endereco.uf = uf;
    complemento ? (endereco.complemento = complemento) : null;
    endereco.cliente = cliente;

    const res = await AddressRepository.save(endereco);

    return response.status(201).json({ result: res });
  } catch (err: any) {
    console.error('Create Cliente router error =>', err.message);
    return response.status(400).json({ error: err.message });
  }
};

const GetUsers = async (request: Request, response: Response) => {
  try {
    const { top, skip } = request.query;
    const TOP: number = top ? parseInt(String(top)) : 15;
    const SKIP: number = skip ? parseInt(String(skip)) : 0;

    const [Users, UsersCount] = await UserRepository.findAndCount({
      take: TOP,
      skip: SKIP,
      relations: { endereco: { cliente: false } },
    });

    return response
      .status(200)
      .json({ result: { data: Users, total_registers: UsersCount } });
  } catch (err: any) {
    console.error('GETALL Cliente router error =>', err.message);
    return response.status(400).json({ result: err.message });
  }
};

const GetUserById = async (request: Request, response: Response) => {
  const idCliente: number = parseInt(request.params.id);
  try {
    const res = await UserRepository.findOne({
      where: { id: idCliente },
      relations: { endereco: true },
    });
    return response.status(200).json({ result: res });
  } catch (err: any) {
    console.error('GETBYID Cliente router error =>', err.message);
    return response.status(400).json({ result: err.message });
  }
};

clienteRoutes.post('/', CreateUser);
clienteRoutes.get('/', GetUsers);
clienteRoutes.get('/:id', GetUserById);

export default clienteRoutes;
