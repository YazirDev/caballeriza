package com.caballeriza.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.caballeriza.model.Empleado;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    List<Empleado> findByRol(Empleado.RolEmpleado rol);
    Boolean existsByUsuarioId(Long usuarioId);
}