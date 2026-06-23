package com.caballeriza.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "historial_medico")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistorialMedico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "caballo_id", nullable = false)
    private Caballo caballo;

    @Enumerated(EnumType.STRING)
    private TipoRegistro tipo;

    @Column(nullable = false)
    private String descripcion;

    private String responsable;
    private LocalDate fecha;
    private LocalDate fechaVencimiento;

    public enum TipoRegistro { VACUNA, TRATAMIENTO, ALERGIA, OBSERVACION }
}