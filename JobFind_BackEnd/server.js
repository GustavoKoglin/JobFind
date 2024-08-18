import { fastify } from 'fastify';

const server = fastify();


server.post('/auth/candidato/registrar', function(req, res) {
    res.send({ message: 'Candidato registrado com sucesso!' });
});

server.post('/auth/empresa/registrar', function(req, res) {
    res.send({ message: 'Empresa registrada com sucesso!' });
});

server.get('/perfil/candidato', function(req, res) {
    res.send({ message: 'Perfil do candidato' });
});

server.get('/perfil/empresa', function(req, res) {
    res.send({ message: 'Perfil da empresa' });
});

server.patch('/candidato/editar', function(req, res) {
    res.send({ message: 'Candidato atualizado com sucesso!' });
});

server.patch('/empresa/editar', function(req, res) {
    res.send({ message: 'Empresa atualizada com sucesso!' });
});

server.delete('/candidato/excluir', function(req, res) {
    res.send({ message: 'Candidato excluído com sucesso!' });
});

server.delete('/empresa/excluir', function(req, res) {
    res.send({ message: 'Empresa excluída com sucesso!' });
});

server.listen({
    port: 3000,
})