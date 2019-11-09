/**
 *  *** configurações do queue para filas ***
 *
 *   *** Uma fila para cada background job ***
 *
 *
 *
 */

import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
    constructor() {
        this.queues = {};
        this.init();
    }

    init() {
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                // instancia que conecta com o redis
                bee: new Bee(key, {
                    redis: redisConfig,
                }),
                // processamento
                handle,
            };
        });
    }

    add(queue, job) {
        // Adiciona o job
        return this.queues[queue].bee.createJob(job).save();
    }

    processQueue() {
        // processa o job em tempo real
        jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key];

            bee.on('failed', this.handleFailure).process(handle);
        });
    }

    // Monitora falhas na fila
    handleFailure(job, err) {
        console.log(`Queue ${job.queue.name}: FAILED`, err);
    }
}

export default new Queue();
