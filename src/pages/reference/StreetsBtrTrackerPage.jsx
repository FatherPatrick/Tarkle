import streets3dImage from '../../assets/streets-3d.jpg'

const STREETS_POINTS = [
  { id: 'streets-1', label: 'Collapsed Crane', left: '49.8%', top: '62.8%' },
  { id: 'streets-2', label: 'Old Scav Checkpoint', left: '56.2%', top: '38.3%' },
  { id: 'streets-3', label: 'Pinewood Hotel', left: '69.55%', top: '49%' },
  { id: 'streets-4', label: 'City Center', left: '61.3%', top: '62.4%' },
  { id: 'streets-5', label: 'Tram', left: '73.55%', top: '69.5%' },
  { id: 'streets-6', label: 'Rodina Cinema', left: '67.15%', top: '87%' }
]

function StreetsBtrTrackerPage() {
  return (
    <section className="content-page btr-tracker-page">
      <div className="btr-tracker-header">
        <h1>Streets of Tarkov BTR Tracker</h1>
        <a className="legal-back" href="/">
          Back Home
        </a>
      </div>

      <div className="btr-tracker-stage">
        <div className="btr-map-wrap">
          <img
            className="btr-tracker-image"
            src={streets3dImage}
            alt="Streets of Tarkov 3D map for BTR route tracking"
          />

          {STREETS_POINTS.map((point) => (
            <button
              key={point.id}
              type="button"
              className="btr-hotspot"
              style={{ left: point.left, top: point.top }}
              aria-label={point.label}
            >
              <span className="btr-hotspot-dot" aria-hidden="true" />
              <span className="btr-hotspot-tooltip">{point.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StreetsBtrTrackerPage
