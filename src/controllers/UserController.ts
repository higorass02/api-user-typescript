import { Request, Response} from 'express'
import User from '../schemas/User'

class UserController {
    public async index(req: Request, res:Response): Promise<Response> {
        const users = await User.find()

        return res.json(users)
    }

    public async store (req: Request, res: Response): Promise<Response> {
        try{
            const user = await User.create(req.body)
            return res.json(user)
        }catch(e){
            return res.json(['Erro na criacao do Usuario',400])
        }        
    }

    public async update (req: Request, res: Response): Promise<Response> {
        if(!req.params.id){
            return res.json('Id do usuario não informado!')
        }
        const userId: string = req.params.id
        
        try{
            var user = await User.findById(userId);
        }catch(e){
            return res.json('Usuario não encontrado!')
        }

        var data = req.body,
        u:boolean = false;

        if(data.firstName != user.firstName){
            u = true
            user.firstName = data.firstName
        }

        if(data.email != user.email){
            u = true
            user.email = data.email
        }

        if(data.lastName != user.lastName){
            u = true
            user.lastName = data.lastName
        }
        if(u == false){
            return res.json('Não na alteração de dados para ser feita!')
        }else{
            user.save()
        }
        
        return res.json('Dados Atualizados com sucesso!')
    }

    public async delete (req: Request, res: Response): Promise<Response> {
        
        if(!req.params.id){
            return res.json('Id do usuario não informado!')
        }
        const userId: string = req.params.id
        
        try{
            var user = await User.findById(userId);
        }catch(e){
            return res.json('Usuario não encontrado!')
        }

        try{
            user.delete()
            return res.json('Usuario excluido!')
        }catch(e){
            return res.json('erro ao excluir o usuario!')
        }
        
        return res.json()
    }
}

export default new UserController()