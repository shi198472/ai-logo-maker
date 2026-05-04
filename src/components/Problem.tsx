export default function Problem() {
  const pains = [
    { icon: '💰', title: '设计师太贵', desc: '一个Logo报价$300-2000，小企业承受不起' },
    { icon: '😫', title: '自己设计太丑', desc: 'Canva学了半天，做出来还是像山寨' },
    { icon: '🧊', title: '版权不放心', desc: '模板Logo怕侵权，不知道能不能商用' },
    { icon: '📦', title: '只有Logo不够', desc: '还需要名片、社媒图、品牌色，又要从头做' },
  ]
  return (
    <section className="py-20 px-4 bg-[#FEF9EF]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-4 font-[Space_Grotesk]">
          打造品牌视觉，一定要这么难吗？
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {pains.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="text-xl font-bold text-[#2D3436] mb-2 font-[Space_Grotesk]">{p.title}</h3>
              <p className="text-[#636E72] font-[DM_Sans]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
