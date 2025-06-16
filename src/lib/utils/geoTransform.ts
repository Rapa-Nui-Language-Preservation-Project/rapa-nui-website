// src/lib/utils/geoTransform.ts

type ControlPoint = {
	lat: number;
	lng: number;
	x: number; // percentage (0–100)
	y: number; // percentage (0–100)
};

const controlPoints: ControlPoint[] = [
	{ lat: -27.073125, lng: -109.318136, x: 58.4166, y: 22.6587 },
	{ lat: -27.141124, lng: -109.301525, x: 67.1255, y: 55.8563 },
	{ lat: -27.200952, lng: -109.453085, x: 7.90499, y: 83.1258 },
	{ lat: -27.150287, lng: -109.438804, x: 13.8002, y: 53.2216 }
];

/**
 * Solve Ax = b using the normal equations: (AᵗA)x = Aᵗb
 */
function solveAffine(A: number[][], b: number[]): number[] {
	const AT = A[0].map((_, i) => A.map((row) => row[i])); // transpose A

	// compute ATA
	const ATA = AT.map((row) => AT.map((col) => row.reduce((sum, r, i) => sum + r * col[i], 0)));

	// compute ATb
	const ATb = AT.map((row) => row.reduce((sum, r, i) => sum + r * b[i], 0));

	// Solve 3x3 system using Cramer's Rule (since it's small)
	const det = (m: number[][]) =>
		m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
		m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
		m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

	const D = det(ATA);

	const replaceColumn = (mat: number[][], colIndex: number, newCol: number[]): number[][] =>
		mat.map((row, i) => [...row.slice(0, colIndex), newCol[i], ...row.slice(colIndex + 1)]);

	return [0, 1, 2].map((i) => det(replaceColumn(ATA, i, ATb)) / D);
}

function computeAffineTransform(points: ControlPoint[]) {
	const A: number[][] = [];
	const bx: number[] = [];
	const by: number[] = [];

	for (const p of points) {
		A.push([p.lng, p.lat, 1]);
		bx.push(p.x);
		by.push(p.y);
	}

	return {
		xCoeffs: solveAffine(A, bx), // [a, b, tx]
		yCoeffs: solveAffine(A, by) // [c, d, ty]
	};
}

const { xCoeffs, yCoeffs } = computeAffineTransform(controlPoints);

export function transformLatLngToXY(lat: number, lng: number): { x: number; y: number } {
	const [a, b, tx] = xCoeffs;
	const [c, d, ty] = yCoeffs;

	const x = a * lng + b * lat + tx;
	const y = c * lng + d * lat + ty;

	return { x, y };
}
