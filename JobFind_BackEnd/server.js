import { fastify } from 'fastify';

const server = fastify();


server.post('/auth/candidato/registrar', (req, res) => {
    res.send({ message: 'Candidato registrado com sucesso!' });
});

server.post('/auth/empresa/registrar', (req, res) => {
    res.send({ message: 'Empresa registrada com sucesso!' });
});

server.get('/perfil/candidato', (req, res) => {
    res.send({ message: 'Perfil do candidato' });
});

server.get('/perfil/empresa', (req, res) => {
    res.send({ message: 'Perfil da empresa' });
});

server.patch('/candidato/editar', (req, res) => {
    const candidate = req.body.candidate;
    const { name, email, password, phone, address, experience } = req.body;
    const candidateUpdate = database.update(candidate, {
        name, 
        email, 
        password, 
        phone, 
        address, 
        experience,  // Assuming experience is an array of job experiences
    })
    res.send({ message: 'Candidato atualizado com sucesso!' });
});

server.patch('/empresa/editar', (req, res) => {
    res.send({ message: 'Empresa atualizada com sucesso!' });
});

server.delete('/candidato/excluir', (req, res) => {
    res.send({ message: 'Candidato excluído com sucesso!' });
});

server.delete('/empresa/excluir', (req, res) => {
    res.send({ message: 'Empresa excluída com sucesso!' });
});

server.listen({
    port: 3000,
});