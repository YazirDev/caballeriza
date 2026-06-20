package com.caballeriza.controller;

import com.caballeriza.model.*;
import com.caballeriza.service.AlimentacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/alimentacion")
@RequiredArgsConstructor
public class AlimentacionController {

    private final AlimentacionService alimentacionService;

    @GetMapping("/planes/{caballoId}")
    public ResponseEntity<List<PlanAlimentacion>> listarPlanes(@PathVariable Long caballoId) {
        return ResponseEntity.ok(alimentacionService.listarPlanes(caballoId));
    }

    @PostMapping("/planes")
    public ResponseEntity<PlanAlimentacion> crearPlan(@RequestBody PlanAlimentacion plan) {
        return ResponseEntity.status(HttpStatus.CREATED).body(alimentacionService.crearPlan(plan));
    }

    @DeleteMapping("/planes/{id}")
    public ResponseEntity<Void> eliminarPlan(@PathVariable Long id) {
        alimentacionService.eliminarPlan(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/suministros")
    public ResponseEntity<Suministro> registrarSuministro(@RequestBody Suministro suministro) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(alimentacionService.registrarSuministro(suministro));
    }

    @GetMapping("/suministros/{caballoId}")
    public ResponseEntity<List<Suministro>> listarSuministros(@PathVariable Long caballoId) {
        return ResponseEntity.ok(alimentacionService.listarSuministros(caballoId));
    }

    @GetMapping("/inventario")
    public ResponseEntity<List<Inventario>> listarInventario() {
        return ResponseEntity.ok(alimentacionService.listarInventario());
    }

    @PostMapping("/inventario")
    public ResponseEntity<Inventario> crearInventario(@RequestBody Inventario inventario) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(alimentacionService.crearInventario(inventario));
    }

    @PutMapping("/inventario/{id}")
    public ResponseEntity<Inventario> actualizarInventario(@PathVariable Long id,
                                                            @RequestBody Inventario inventario) {
        return ResponseEntity.ok(alimentacionService.actualizarInventario(id, inventario));
    }

    @GetMapping("/inventario/stock-bajo")
    public ResponseEntity<List<Inventario>> listarStockBajo() {
        return ResponseEntity.ok(alimentacionService.listarStockBajo());
    }
}