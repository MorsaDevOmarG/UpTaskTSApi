import { Request, Response } from 'express';
import { INote } from '../models/Note';

export class NoteController {
  static createNote(req: Request<{}, {}, INote>, res: Response) {
    // console.log(req.body);

    const { content } = req.body;
  }

}