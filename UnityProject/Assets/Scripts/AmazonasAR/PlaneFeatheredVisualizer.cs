using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;

namespace AmazonasAR
{
    // Visualizador simple para que los planos AR no distraigan: activa/desactiva y ajusta material
    [RequireComponent(typeof(ARPlane))]
    public class PlaneFeatheredVisualizer : MonoBehaviour
    {
        public Material planeMaterial;
        public Color color = new Color(0f, 0.5f, 0.35f, 0.2f);

        ARPlane m_Plane;

        void Awake()
        {
            m_Plane = GetComponent<ARPlane>();
            if (planeMaterial)
            {
                var mr = GetComponent<MeshRenderer>();
                if (mr)
                {
                    mr.material = planeMaterial;
                    mr.material.color = color;
                }
            }
        }

        void OnEnable()
        {
            m_Plane.boundaryChanged += PlaneOnboundaryChanged;
        }

        void OnDisable()
        {
            m_Plane.boundaryChanged -= PlaneOnboundaryChanged;
        }

        void PlaneOnboundaryChanged(ARPlaneBoundaryChangedEventArgs obj)
        {
            // Aquí podrías recalcular feathering/alpha si usas un shader específico.
        }
    }
}