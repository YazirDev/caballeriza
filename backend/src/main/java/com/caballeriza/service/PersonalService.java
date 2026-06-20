package com.caballeriza.service;

import com.caballeriza.model.*;
import com.caballeriza.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonalService {

    private final EmpleadoRepository empleadoRepository;
    private final TurnoRepository turnoRepository;
    private final TareaRepository tareaRepository;

    public List<Empleado> listarTodos() {
        return empleadoRepository.findAll();
    }

    public Empleado obtenerPorId(Long id) {
        return empleadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado: " + id));
    }

    public Empleado crear(Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    public Empleado actualizar(Long id, Empleado datos) {
        Empleado empleado = obtenerPorId(id);
        empleado.setNombre(datos.getNombre());
        empleado.setRol(datos.getRol());
        empleado.setContacto(datos.getContacto());
        return empleadoRepository.save(empleado);
    }

    public void eliminar(Long id) {
        empleadoRepository.deleteById(id);
    }

    public Turno agregarTurno(Long empleadoId, Turno turno) {
        Empleado empleado = obtenerPorId(empleadoId);
        turno.setEmpleado(empleado);
        return turnoRepository.save(turno);
    }

    public List<Turno> listarTurnos(Long empleadoId) {
        return turnoRepository.findByEmpleadoId(empleadoId);
    }

    public Tarea agregarTarea(Long empleadoId, Tarea tarea) {
        Empleado empleado = obtenerPorId(empleadoId);
        tarea.setEmpleado(empleado);
        return tareaRepository.save(tarea);
    }

    public List<Tarea> listarTareas(Long empleadoId) {
        return tareaRepository.findByEmpleadoId(empleadoId);
    }
}