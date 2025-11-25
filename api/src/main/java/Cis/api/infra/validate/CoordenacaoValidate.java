package Cis.api.infra.validate;

import Cis.api.domain.entity.Coordenacao;
import Cis.api.infra.repository.CoordenacaoRepository;
import org.springframework.stereotype.Component;

@Component
public class CoordenacaoValidate {

    private final CoordenacaoRepository repository;

    public CoordenacaoValidate(CoordenacaoRepository repository) {
        this.repository = repository;
    }

    public Coordenacao validarCoordenacaoPorId(Long id){
        return repository.findById(id).orElseThrow(()-> new RuntimeException("Coordenador(a) não encontrado"));
    }

    public Coordenacao validarCoordenacaoPorNome(String nome){
        return repository.findByNome(nome.trim()).orElseThrow(()-> new RuntimeException("Coordenador(a) não encontrado"));
    }

}
