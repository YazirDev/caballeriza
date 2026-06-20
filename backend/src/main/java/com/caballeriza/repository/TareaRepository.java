package com.caballeriza.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.caballeriza.model.Tarea;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
    List<Tarea> findByEmpleadoId(Long empleadoId);
    List<Tarea> findByEstado(Tarea.EstadoTarea estado);
}