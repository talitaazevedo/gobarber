import {
    startOfDay,
    endOfDay,
    format,
    setHours,
    setMinutes,
    setSeconds,
    isAfter,
} from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';

class AvailableController {
    async index(req, res) {
        // recbe o parametro em formato de query
        const { date } = req.query;
        // se não houver data  retorna erro
        if (!date) {
            return res.status(400).json({ error: 'Invalid date' });
        }

        const searchDate = Number(date);
        // Busca agendamentos no banco
        const appointments = await Appointment.findAll({
            where: {
                provider_id: req.params.providerId,
                // Canceled_at deve ser null
                canceled_at: null,
                date: {
                    // Op vem do sequelize
                    [Op.between]: [
                        startOfDay(searchDate),
                        endOfDay(searchDate),
                    ],
                },
            },
        });
        // Var statica de horarios disponíveis no app
        const schedule = [
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
        ];

        // Faz um map na var schedule
        const available = schedule.map(time => {
            // desestruturação quebra em dois arr o horário
            const [hour, minute] = time.split(':');
            // está var pega os dados da houra e do searc
            const value = setSeconds(
                setMinutes(setHours(searchDate, hour), minute),
                0
            );

            return {
                time,
                value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                available:
                    // aqui recebe o value e uma nova data
                    isAfter(value, new Date()) &&
                    !appointments.find(a => format(a.date, 'HH:mm') === time),
            };
        });
        return res.json(available);
    }
}

export default new AvailableController();
