package com.caballeriza.controller;

import com.caballeriza.model.*;
import com.caballeriza.service.PersonalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/personal")
@RequiredArgsConstructor
public class PersonalController {

    private final PersonalService personalService;

    @GetMapping
    public ResponseEntity<List<Empleado>> listarTodos() {
        return ResponseEntity.ok(personalService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empleado> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(personalService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<Empleado> crear(@RequestBody Empleado empleado) {
        return ResponseEntity.status(HttpStatus.CREATED).body(personalService.crear(empleado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empleado> actualizar(@PathVariable Long id, @RequestBody Empleado empleado) {
        return ResponseEntity.ok(personalService.actualizar(id, empleado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        personalService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/turnos")
    public ResponseEntity<Turno> agregarTurno(@PathVariable Long id, @RequestBody Turno turno) {
        return ResponseEntity.status(HttpStatus.CREATED).body(personalService.agregarTurno(id, turno));
    }

    @GetMapping("/{id}/turnos")
    public ResponseEntity<List<Turno>> listarTurnos(@PathVariable Long id) {
        return ResponseEntity.ok(personalService.listarTurnos(id));
    }

    @PostMapping("/{id}/tareas")
    public ResponseEntity<Tarea> agregarTarea(@PathVariable Long id, @RequestBody Tarea tarea) {
        return ResponseEntity.status(HttpStatus.CREATED).body(personalService.agregarTarea(id, tarea));
    }

    @GetMapping("/{id}/tareas")
    public ResponseEntity<List<Tarea>> listarTareas(@PathVariable Long id) {
        return ResponseEntity.ok(personalService.listarTareas(id));
    }
}