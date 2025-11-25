package Cis.api.infra.service;

import Cis.api.domain.dtos.request.coordenacao.CoordenacaoDtoRequest;
import Cis.api.domain.dtos.response.CoordenacaoDtoResponse;

import java.util.List;

public interface CoordenacaoService {

    CoordenacaoDtoResponse criarCoordenacao(CoordenacaoDtoRequest dto);

    List<CoordenacaoDtoResponse> listarTodosDaCoordenacao();

    CoordenacaoDtoResponse alterarCoordenacao(Long id,CoordenacaoDtoRequest dto);

    CoordenacaoDtoResponse buscarPorId(Long id);

    CoordenacaoDtoResponse buscarPorNome(String nome);

    void deletarCoordenacaoPorId(Long id);
    void deletarCoordenacaoPorNome(String nome);
}
