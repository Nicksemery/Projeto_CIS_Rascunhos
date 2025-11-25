package Cis.api.domain.dtos.response;

public record PacienteDtoResponse(
        Long id,
        String nome,
        String telefone,
        Long idCoordenacao,
        Long idUsuario
) {
}
