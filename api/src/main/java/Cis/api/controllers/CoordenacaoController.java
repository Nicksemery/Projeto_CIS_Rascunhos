package Cis.api.controllers;

import Cis.api.domain.dtos.request.coordenacao.CoordenacaoDtoRequest;
import Cis.api.domain.dtos.response.CoordenacaoDtoResponse;
import Cis.api.infra.service.CoordenacaoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/coordenacao")
public class CoordenacaoController {

    private final CoordenacaoService service;

    public CoordenacaoController(CoordenacaoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CoordenacaoDtoResponse> cadastrarCoordenacao(@RequestBody CoordenacaoDtoRequest coordenacaoDtoRequest, UriComponentsBuilder uriBuilder) {
        CoordenacaoDtoResponse cadastrar = service.criarCoordenacao(coordenacaoDtoRequest);

        URI uri = uriBuilder.path("/coordenacao/{id}").build(cadastrar.id());

        return ResponseEntity.created(uri).body(cadastrar);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoordenacaoDtoResponse> buscarCoordenacaoPorId(@PathVariable Long id) {
        CoordenacaoDtoResponse coordenacao = service.buscarPorId(id);
        return ResponseEntity.ok(coordenacao);
    }

    @GetMapping("/buscar")
    public ResponseEntity<CoordenacaoDtoResponse> buscarPorNome(@RequestParam String nome) {
        try{
            CoordenacaoDtoResponse coordenacao = service.buscarPorNome(nome);
            return ResponseEntity.ok(coordenacao);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<CoordenacaoDtoResponse>> listarCoordenacoes() {
        List<CoordenacaoDtoResponse> coordenacao = service.listarTodosDaCoordenacao();
        return ResponseEntity.ok(coordenacao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CoordenacaoDtoResponse> atualizarCoordenacao(@PathVariable Long id,@RequestBody CoordenacaoDtoRequest dto) {
        CoordenacaoDtoResponse coordenacao = service.alterarCoordenacao(id, dto);
        return ResponseEntity.ok(coordenacao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletarCoordenacao(@PathVariable Long id) {
        service.deletarCoordenacaoPorId(id);
        return ResponseEntity.noContent().build();
    }

}
