import { Request, Response } from 'express'
import UserModel from '../models/UserModel'

class UserController {
  public User: UserModel[] = [
    {
      id: 1,
      name: 'Test 1',
      email: 'test1@test.com.br'
    },
    {
      id: 2,
      name: 'Test2 2',
      email: 'test2@test.com.br'
    }
  ]

  /**
   * [GET] /users
   * @param req: Request
   * @param res: Response
   */
  public index = async (req: Request, res: Response): Promise <Response> => {
    return res.json(this.User)
  }

  /**
   * [POST] /users
   * @param req: Request
   * @param res: Response
   */
  public store = async (req: Request, res: Response): Promise <Response> => {
    const { id, name, email } = req.body
    this.User.push({
      id,
      name,
      email
    })
    return res.json(this.User)
  }
}

export default new UserController()
