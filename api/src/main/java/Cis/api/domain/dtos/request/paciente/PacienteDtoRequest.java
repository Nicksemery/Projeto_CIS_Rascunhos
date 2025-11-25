package Cis.api.domain.dtos.request.paciente;

import Cis.api.domain.dtos.request.TokenDtoRequest;

public record PacienteDtoRequest(
        String nome,
        String telefone,
        Long idCoordenacao,
        TokenDtoRequest dadosUsuario
) {
}
