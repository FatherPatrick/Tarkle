import woods3dImage from '../../assets/woods-3d.jpg'
import TarkovTimeBadge from './components/TarkovTimeBadge'

const WOODS_POINTS = [
  { id: 'woods-1', label: 'Scav bunker', left: '41.7%', top: '15.9%' },
  { id: 'woods-2', label: 'Sunken Village', left: '52.2%', top: '16.6%' },
  { id: 'woods-3', label: 'Old Sawmill', left: '67.4%', top: '40%' },
  { id: 'woods-4', label: 'Sawmill', left: '47.3%', top: '47.2%' },
  { id: 'woods-5', label: 'Junction', left: '51.6%', top: '32.5%' },
  { id: 'woods-6', label: 'Emercom Base', left: '53.8%', top: '65.8%' },
  { id: 'woods-7', label: 'USEC Checkpoint', left: '39.6%', top: '49.2%' },
  { id: 'woods-8', label: 'Train Depot', left: '73.2%', top: '59%' }
]

function WoodsBtrTrackerPage() {
  return (
    <section className="content-page btr-tracker-page">
      <div className="btr-tracker-header">
        <h1>Woods BTR Tracker</h1>
        <a className="legal-back" href="/">
          Back Home
        </a>
      </div>

      <div className="btr-tracker-stage">
        <div className="btr-map-wrap">
          <TarkovTimeBadge />

          <img
            className="btr-tracker-image"
            src={woods3dImage}
            alt="Woods 3D map for BTR route tracking"
          />

          {WOODS_POINTS.map((point) => (
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

export default WoodsBtrTrackerPage
