package Cis.api.domain.dtos.request.coordenacao;

public record CoordenacaoDtoUpdateRequest(
        String nome,
        String email,
        String telefone
) {
}
