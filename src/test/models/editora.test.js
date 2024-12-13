import { expect, it, describe, jest } from "@jest/globals";
import Editora from "../../models/editora";

describe('testando o modelo Editora', () => {
    const objetoEditora = {
        nome: 'Senac ZN',
        cidade: 'Natal',
        email: 'senac@rn.com'
    }

    it('deve instanciar uma nova editora', () => {
        const editora = new Editora(objetoEditora);

        expect(editora).toEqual(
            expect.objectContaining(objetoEditora),
        );
    });
    //.skip serve para pular o teste
    it.skip('deve salvar editora no DB', () => {
        const editora = new Editora(objetoEditora);

        //vai receber dados e depois vai enviar
        editora.salvar().then((dados) => {
            expect(dados.nome).toBe('Senac ZN');
        });
    });

    it.skip('deve salvar editora no DB usando sintaxe moderna', async () => {

        const dados = await editora.salvar();

        const retornado = await Editora.pegarPeloId(dados.id);

        expect(retornado).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                //resto do objeto
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            })
        );
    });

    it('deve fazer uma chamada simulada ao DB', () => {
        const editora = new Editora(objetoEditora);

        editora.salvar = jest.fn().mockReturnValue({
            id: 11,
            nome: 'Senac ZN',
            cidade: 'Natal',
            email: 'senac@rn.com',
            created_at: "2022-07-01 19:49:06",
            updated_at: "2022-07-01 19:49:06"
        });
        const retorno = editora.salvar();
        expect(retorno).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                //resto do objeto
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            })
        );
    });
});