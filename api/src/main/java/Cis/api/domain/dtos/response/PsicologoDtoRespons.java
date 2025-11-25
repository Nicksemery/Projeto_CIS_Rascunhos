package Cis.api.domain.dtos.response;

import lombok.Data;

public record PsicologoDtoRespons(
        Long id,
        String nome,
        String matricula,
        Long idCoordenacao,
        Long idUsuario
) {

}
