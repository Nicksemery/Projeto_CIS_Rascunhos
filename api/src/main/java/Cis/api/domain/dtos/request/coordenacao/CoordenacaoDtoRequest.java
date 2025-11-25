package Cis.api.domain.dtos.request.coordenacao;

import Cis.api.domain.dtos.request.TokenDtoRequest;

public record CoordenacaoDtoRequest (
        String nome,
        String email,
        String telefone,
        TokenDtoRequest dadosUsuario
) {
}
