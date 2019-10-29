// trabalhando com imagens
import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        // este objeto ffilename recebe uma função em fforma de callback cb, não suporta arrow functions
        filename: (req, file, cb) => {
            // crypto é uma função do node
            crypto.randomBytes(16, (err, res) => {
                // se der erro retorna erro
                if (err) return cb(err);
                // gera um  hexadecimal e une ao arquivo de nome original
                return cb(
                    null,
                    res.toString('hex') + extname(file.originalname)
                );
            });
        },
    }),
};
