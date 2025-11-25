package Cis.api.infra.service;

import Cis.api.domain.dtos.request.psicologo.PsicologoDtoRequest;
import Cis.api.domain.dtos.request.psicologo.PsicologoDtoUpdateRequest;
import Cis.api.domain.dtos.response.PsicologoDtoRespons;

import java.util.List;

public interface PsicologoService {

    PsicologoDtoRespons cadastrarPsicologo(PsicologoDtoRequest dto);

    List<PsicologoDtoRespons> listarPsicologos();

    PsicologoDtoRespons buscarPsicologoPorId(Long id);

    PsicologoDtoRespons buscarPsicologoPorNome(String nome);

    PsicologoDtoRespons atualizarPsicologo(Long id , PsicologoDtoUpdateRequest dto);

    void deletarPsicologoPorId(Long id);

    void deletarPsicologoPorNome(String nome);

}
