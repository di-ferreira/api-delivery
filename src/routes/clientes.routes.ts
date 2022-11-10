import { Router, Request, Response } from 'express';
import { Cliente } from '../database/models/Cliente';
import AppDataSource from '../DataSource';

const clienteRoutes = Router();

const UserRepository = AppDataSource.getRepository(Cliente);

const CreateUser = async (request: Request, response: Response) => {
  try {
    const { nome, telefone } = request.body;

    const cliente = new Cliente();
    cliente.nome = nome;
    // cliente.rua = rua;
    // cliente.numero = numero;
    // cliente.bairro = bairro;
    // cliente.cidade = cidade;
    // cliente.uf = uf;
    // cliente.complemento = complemento;
    // complemento ? (cliente.complemento = complemento) : null;
    cliente.telefone = telefone;

    const res = await UserRepository.save(cliente);

    return response.status(201).json({ result: res });
  } catch (err) {
    console.error('Cliente router error =>', err.message);
    return response.status(400).json({ error: err.message });
  }
};

const GetUsers = async (response: Response) => {
  try {
    const res = await UserRepository.find();
    return response.status(200).json({ result: res });
  } catch (err) {
    const res = { result: err };
    return response.status(400).json({ result: res });
  }
};

const GetUserById = async (request: Request, response: Response) => {
  const idCliente: number = parseInt(request.params.id);
  try {
    const res = await UserRepository.findOne({
      where: { id: idCliente },
    });
    return response.status(201).json({ result: res });
  } catch (err) {
    const res = { result: err.message };
    return response.status(400).json(res);
  }
};

clienteRoutes.post('/', CreateUser);
clienteRoutes.get('/', GetUsers);
clienteRoutes.get('/:id', GetUserById);

export default clienteRoutes;
