import { fastify } from 'fastify';

const server = fastify();


server.post('/auth/candidato/registrar', function(req, res) {
    res.send({ message: 'Candidato registrado com sucesso!' });
});

server.post('/auth/empresa/registrar', function(req, res) {
    res.send({ message: 'Empresa registrada com sucesso!' });
});

server.listen({
    port: 3000,
})