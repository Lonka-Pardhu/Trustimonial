export default function SpaceFormPage({
  params,
}: {
  params: { spaceKey: string };
}) {
  return (
    <div>
      <h1>{params.spaceKey}</h1>
      
    </div>
  );
}
