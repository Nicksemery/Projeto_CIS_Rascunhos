package Cis.api.infra.mapper;

import Cis.api.domain.dtos.request.psicologo.PsicologoDtoRequest;
import Cis.api.domain.dtos.response.PsicologoDtoRespons;
import Cis.api.domain.entity.Coordenacao;
import Cis.api.domain.entity.Psicologo;
import Cis.api.domain.entity.Usuario;
import org.springframework.stereotype.Component;

@Component
public class PsicologoMapper {


    public Psicologo entidade(PsicologoDtoRequest dto, Coordenacao coordenacao, Usuario usuario) {
        if (dto == null) {
            return null;
        }
        return new Psicologo(
                dto.nome(),
                dto.matricula(),
                coordenacao,
                usuario
        );
    }

    public PsicologoDtoRespons dtoResposta(Psicologo psicologo) {
        if (psicologo == null) {
            return null;
        }
        return new PsicologoDtoRespons(
                psicologo.getId(),
                psicologo.getNome(),
                psicologo.getMatricula(),
                psicologo.getCoordenacao().getId(),
                psicologo.getUsuario().getId()
        );
    }
}
