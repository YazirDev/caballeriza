package com.caballeriza.dto;

import java.time.LocalDate;

import com.caballeriza.model.HistorialMedico;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistorialMedicoRequest {

    @NotNull(message = "El tipo es obligatorio")
    private HistorialMedico.TipoRegistro tipo;

    @NotBlank(message = "La descripción es obligatoria")
    private String descripcion;

    private String responsable;
    private LocalDate fecha;
    private LocalDate fechaVencimiento;
}