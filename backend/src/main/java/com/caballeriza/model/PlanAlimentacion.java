package com.caballeriza.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "planes_alimentacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanAlimentacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "caballo_id", nullable = false)
    private Caballo caballo;

    @Column(nullable = false)
    private String tipoAlimento;

    private Double cantidad;
    private String unidad;
    private String frecuencia;
    private String notas;
}