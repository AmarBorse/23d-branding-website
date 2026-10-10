import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-hero container center notfound">
      <h1 className="page-title">This page wandered off</h1>
      <p className="lead">The link may be old or mistyped.</p>
      <Link href="/" className="btn btn--orange">Go to the home page</Link>
    </section>
  );
}
