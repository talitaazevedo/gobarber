import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
// eslint-disable-next-line import/no-unresolved
import Mail from '../../lib/Mail';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        console.log('A fila executou');
        const { appointment } = data;
        await Mail.sendMail({
            to: `${appointment.provider.name}  <${appointment.provider.email} >`,
            subject: 'Agendamento Cancelado',
            template: 'cancellation',
            // envia todas as váriaveis que o cancellation está esperando
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date: format(
                    parseISO(appointment.date),
                    "'dia' dd 'de' MMM', às 'H:mm'h'",
                    {
                        locale: pt,
                    }
                ),
            },
        });
    }
}

export default new CancellationMail();
